1. 如何產生推播通知所需的 vapid key

```bash
npx web-push generate-vapid-keys

# =======================================

Public Key:
BOsywqEhVGYZQQN4K0BGDwDog7N9Uimz91lxH3mYa8DteA7WGrXQaBOCO-m_63xlImlTCriOzkaKlJ_X35B7lX4

Private Key:
XXi7i2ubyGHGrG-OiBUdMBcERm9lDXRdjsZn7fYjYZ8

# =======================================
```

2. 將 public key 和 private key 放進環境變數 .env 

```bash
# .env 
VAPID_PUBLIC_KEY=BOsywqEhVGYZQQN4K0BGDwDog7N9Uimz91lxH3mYa8DteA7WGrXQaBOCO-m_63xlImlTCriOzkaKlJ_X35B7lX4
VAPID_PRIVATE_KEY=XXi7i2ubyGHGrG-OiBUdMBcERm9lDXRdjsZn7fYjYZ8
```

