# HACKOLUTION-2026-MINEGAURD-
# 🛡️ MineGuard — Intelligent IoT Real-Time Hazardous Environment Monitoring System

> **"Protecting Lives, One Pulse at a Time."**

[![Hackathon](https://img.shields.io/badge/Event-Hackathon%202025-blue?style=flat-square)](/)
[![Platform](https://img.shields.io/badge/Platform-ESP32-green?style=flat-square)](/)
[![Framework](https://img.shields.io/badge/Framework-Arduino%20C%2B%2B-orange?style=flat-square)](/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](/)

**MineGuard** is an ESP32-powered IoT terminal that monitors atmospheric conditions and structural hazards in real-time — bridging local hardware alerts with remote web-based monitoring through a fail-safe dual-alert system. Built for multi-sensor fusion and proactive hazard mitigation in underground mining environments.

---

## 👥 Team — ERROR 404

| # | Name | Role |
|---|------|------|
| 1 | **Sounak Kumar Mondal** | Team Leader |
| 2 | Rajashri Choudhuri | Member |
| 3 | Deepra Sarkar | Member |
| 4 | Krishanu Chakraborty | Member |

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Hardware Architecture](#-hardware-architecture)
- [Dual-Tier Alert System](#-dual-tier-alert-system)
- [Remote Monitoring Dashboard](#-remote-monitoring-dashboard)
- [Why MineGuard](#-why-mineguard-stands-out)
- [Roadmap](#-roadmap)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)

---

## ⚠️ The Problem

Mining is one of the world's most dangerous occupations.

| Statistic | Figure |
|-----------|--------|
| Global mining deaths per year | **2,000+** |
| Deaths caused by gas incidents | **40%** |
| Deaths preventable with real-time monitoring | **60%** |

### Key Challenges

**Silent Killers** — Colorless, odorless gases like CH₄ (Methane) and CO (Carbon Monoxide) cause explosions and asphyxiation with zero warning.

**Environmental Instability** — Sudden floods and extreme heat in deep mines go undetected until it's far too late.

**Delayed Response** — Conventional equipment lacks real-time remote visualization for surface supervisors.

---

## 💡 The Solution

MineGuard is an **Integrated 360° Safety Ecosystem** that provides:

- **Real-Time Sensing** — Continuous multi-sensor sampling every 2 seconds
- **Dual-Tier Alerting** — Graduated alert system from cautionary to critical
- **Remote Monitoring** — Web-based command center accessible to surface supervisors
- **Edge Computing** — All hazard decisions made locally on the ESP32; safe even when internet is unavailable

| Metric | Value |
|--------|-------|
| Sensor Sampling Rate | **2 seconds** |
| Hazard Coverage | **360°** |
| Alert Layers | **2 (Dual-Tier)** |

---

## ✨ Features

- Multi-sensor fusion monitoring (gas, temperature, humidity, water level)
- Intelligent dual-tier hazard grading system
- 16×2 I2C LCD display with automatic slideshow logic
- High-decibel audio siren for critical alerts
- JSON telemetry stream for web app integration
- Real-time web dashboard for surface supervisors
- Historical data logging for safety audits and compliance
- Edge computing — fully operational without network connectivity
- Modular, expandable hardware architecture
- Affordable build cost (~₹1,400 in components)

---

## 🛠️ Tech Stack

### Hardware

| Component | Purpose |
|-----------|---------|
| **ESP32** (Dual-Core) | Main microcontroller & edge computing unit |
| **MQ4 Sensor** | Methane (CH₄) gas detection |
| **MQ135 Sensor** | Air quality & Carbon Monoxide (CO) detection |
| **DHT22 Sensor** | Temperature & Humidity measurement |
| **HC-SR04 Sensor** | Water level detection (flood monitoring) |
| **16×2 I2C LCD Display** | On-site visual readouts and alerts |
| **Active Buzzer / Siren** | High-decibel audio alert output |

### Software

| Technology | Usage |
|------------|-------|
| **C++ (Arduino Framework)** | Firmware development for ESP32 |
| **JSON Telemetry** | Structured sensor data serialization |
| **HTML / JavaScript** | Web-based real-time dashboard |
| **Serial Communication** | Data transfer between ESP32 and dashboard |

---

## 🔩 Hardware Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        SENSORS                          │
│   MQ4 (CH₄)  ·  MQ135 (CO)  ·  DHT22  ·  HC-SR04      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              ESP32 (Dual-Core)                          │
│         Edge Computing & Hazard Classification          │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌───────────┐ ┌─────────┐ ┌──────────────┐
    │  16×2 LCD │ │  Buzzer │ │ JSON Stream  │
    │  Display  │ │  Siren  │ │ → Web Dash   │
    └───────────┘ └─────────┘ └──────────────┘
```

### Design Highlights

**LCD Slideshow Logic** — Automatically rotates between Temperature, Gas levels, and Water level readings for hands-free continuous monitoring without operator intervention.

**Low Latency Response** — All sensors are sampled every 2 seconds, providing near-instant hazard detection and alert triggering with minimal delay.

**Edge Computing Safety** — All hazard classification decisions are made locally on the ESP32 chip. Safety remains fully operational even when the web dashboard connection is lost.

**Modular & Expandable** — Hardware architecture supports seamless sensor additions and future wireless modules (LoRaWAN/WiFi) without redesign.

---

## 🚨 Dual-Tier Alert System

MineGuard uses an intelligent graduated hazard grading system:

### ⚠️ Tier 1 — Cautionary Alert (Yellow Zone)

| Trigger Condition | Threshold |
|-------------------|-----------|
| Gas Level | > 1,800 ppm |
| Temperature | > 40 °C |
| Humidity | Abnormality detected |

**Action:** Visual warning displayed on LCD — notifies workers of rising environmental risks before reaching critical levels.

---

### 🚨 Tier 2 — Critical Danger (Red Zone)

| Trigger Condition | Threshold |
|-------------------|-----------|
| Gas Level | > 3,000 ppm |
| Water Level | < 20 cm (Flood imminent) |
| Temperature | Critically exceeded |

**Action:** High-decibel audio siren activated + Emergency evacuation protocols displayed on LCD immediately.

---

## 🖥️ Remote Monitoring Dashboard

MineGuard streams live sensor data to a web-based command center, accessible to surface supervisors.

### Dashboard Metrics (Live View Example)
Parameter,Permissible Limit,Measurement Frequency
Respirable Dust,2 mg/m³ (if silica content is less than 5%),Every 30 days (minimum)
Noise Level,85 dB(A) for 8-hour shift (Warning level),Periodic Survey
Vibration (HEMM),0.5 m/s² (Weighted RMS acceleration),Continuous Monitoring

### Dashboard Capabilities

**JSON Data Stream** — Sensor data is serialized to JSON for seamless web app integration and processing.

**Live Dashboard** — Real-time metrics visible to surface supervisors via USB/Serial connection.

**Safety Audits** — Historical data enables data-driven safety compliance reports and trend analysis.

---

## 🏆 Why MineGuard Stands Out

### Cost-Effective
Built using affordable, commercially available components — ESP32, MQ sensors, DHT22 — without compromising on industrial-grade safety performance.
> **Component Cost: ~₹1,400**

### Scalable Architecture
Designed for expansion. Upgradeable to LoRaWAN or WiFi for long-range underground communication across entire mine networks.
> **LoRaWAN Range: 5 km+**

### User-Centric Design
Built for low-visibility underground environments with high-contrast 16×2 LCD displays and high-decibel audio sirens for foolproof alerts.
> **Alert Coverage: 360°**

---

## 🗺️ Roadmap

```
Phase 1 ──────────────── Phase 2 ──────────────── Phase 3
   │                        │                        │
LoRaWAN               AI Predictive             Smart Helmets
Integration            Analytics
   │                        │                        │
10km+ wireless         ML models to            Wearable integration
range through          forecast gas leaks       with individual miner
mine tunnels.          & hazards before         tracking, biometric
Enables mesh           they reach critical      monitoring & personal
network of             thresholds.              alert systems.
multiple nodes.
```

---

## 🚀 Getting Started

### Prerequisites

- Arduino IDE or PlatformIO
- ESP32 board support package installed
- Required libraries:
  - `DHT sensor library` (Adafruit)
  - `LiquidCrystal_I2C`
  - `ArduinoJson`
  - `NewPing` (for HC-SR04)

### Hardware Setup

1. Connect sensors to ESP32 GPIO pins as per the circuit diagram.
2. Wire the 16×2 LCD via I2C (SDA/SCL).
3. Connect the active buzzer to a designated GPIO pin.
4. Power the ESP32 via USB or external 5V supply.

### Firmware Upload

```bash
# Clone the repository
git clone https://github.com/your-team/mineguard.git
cd mineguard

# Open in Arduino IDE
# Select board: ESP32 Dev Module
# Select correct COM port
# Upload the sketch
```

### Dashboard

1. Open the `dashboard/index.html` file in a web browser.
2. Connect to the ESP32's serial port.
3. Live sensor readings will populate automatically via the JSON stream.

---

## 📁 Project Structure

```
mineguard/
├── firmware/
│   ├── mineguard.ino        # Main Arduino sketch
│   ├── sensors.h            # Sensor read functions
│   ├── alerts.h             # Dual-tier alert logic
│   └── telemetry.h          # JSON serialization
├── dashboard/
│   ├── index.html           # Web dashboard UI
│   ├── style.css            # Dashboard styling
│   └── app.js               # Serial/JSON data handler
├── hardware/
│   └── circuit_diagram.png  # Wiring schematic
└── README.md
```

---

## 📊 System Summary

| Feature | Detail |
|---------|--------|
| Microcontroller | ESP32 (Dual-Core) |
| Sensors | 4 (CH₄, CO, Temp/Humidity, Water Level) |
| Alert Tiers | 2 (Cautionary + Critical) |
| Sampling Rate | Every 2 seconds |
| Dashboard | Real-time HTML/JS web app |
| Data Format | JSON telemetry |
| Build Cost | ~₹1,400 |
| Future Range | 5km+ (LoRaWAN) |

---

## 📜 License

This project was built for **Hackathon 2026** by Team Error 404. Open for educational and non-commercial use.

---

> *"Technology is best when it brings people home safe."*
>
> — **Team Error 404**
