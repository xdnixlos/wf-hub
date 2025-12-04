import paramiko
import os
import json

SSH_HOST = os.getenv("SSH_HOST", "192.168.1.100") # Default or from env
SSH_USER = os.getenv("SSH_USER", "root")
SSH_KEY_PATH = "/root/.ssh/id_rsa" # Path inside container

def get_real_stats():
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Connect to host
        # Note: In a real scenario, ensure the key exists and has correct permissions
        # For now we assume the key is mounted correctly
        try:
            client.connect(SSH_HOST, username=SSH_USER, key_filename=SSH_KEY_PATH, timeout=2)
        except Exception as e:
            print(f"SSH Connection failed: {e}")
            return _get_mock_stats(error=str(e))

        # 1. CPU & RAM (using free and top/vmstat or just parsing /proc)
        # Simple parsing of 'free -m'
        stdin, stdout, stderr = client.exec_command("free -m")
        free_out = stdout.read().decode().splitlines()
        # Mem: total used free ...
        mem_line = free_out[1].split()
        total_mem = int(mem_line[1])
        used_mem = int(mem_line[2])
        ram_percent = round((used_mem / total_mem) * 100)

        # CPU Load (uptime)
        stdin, stdout, stderr = client.exec_command("uptime | awk -F'load average:' '{ print $2 }'")
        load_avg = stdout.read().decode().strip().split(',')[0] # 1 min load
        # Normalize load to percentage roughly (assuming 4 cores for example, logic varies)
        cpu_percent = min(int(float(load_avg) * 25), 100) # Rough estimate

        # Disk
        stdin, stdout, stderr = client.exec_command("df -h / | tail -1 | awk '{print $5}'")
        disk_percent = int(stdout.read().decode().strip().replace('%', ''))

        # Containers (pct list for Proxmox/LXC)
        # Assuming Proxmox 'pct list'
        stdin, stdout, stderr = client.exec_command("pct list")
        pct_out = stdout.read().decode().splitlines()
        containers = []
        # VMID Status Lock Name
        for line in pct_out[1:]: # Skip header
            parts = line.split()
            if len(parts) >= 3:
                containers.append({
                    "id": parts[0],
                    "status": parts[1],
                    "name": parts[2] if len(parts) > 2 else "unknown",
                    "ip": "N/A" # pct list might not show IP directly without more parsing
                })

        client.close()

        return {
            "cpu": cpu_percent,
            "ram": ram_percent,
            "disk": disk_percent,
            "containers": containers
        }

    except Exception as e:
        print(f"System Stats Error: {e}")
        return _get_mock_stats(error=str(e))

def _get_mock_stats(error=None):
    return {
        "cpu": 0,
        "ram": 0,
        "disk": 0,
        "containers": [],
        "error": error or "SSH Connection Failed"
    }
