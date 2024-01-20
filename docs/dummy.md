---
title: "Getting Started"
date: "2024-01-20"
---

# Project Name

## Description

This project is a self-hosted platform designed to make the process of self-hosting other applications seamless. It provides a user-friendly interface and automates many of the tasks involved in deploying and managing self-hosted applications.

## Features

- **Automated Deployment**: Easily deploy applications with a single click.
- **Management Interface**: Manage all your self-hosted applications from a single dashboard.
- **Support for Multiple Applications**: Supports a wide range of self-hosted applications.

## Installation

on you ubuntu server run the following command to install the cli tool

```bash
wget https://github.com/mdansarijaved/cli/releases/download/v1.1.5/main
```

### Usage

```bash
sudo chmod +x main
sudo ./main
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```.env
"DATABASE_URL",
"GITHUB_CLIENT_ID",
"GITHUB_CLIENT_SECRET",
"NEXTAUTH_SECRET",
"NEXTAUTH_URL",
"ADMIN_MAIL",
"ADMIN_PASS",
"DOMAIN",
```

just be sure to add the correct values to the variables and you're all set.
