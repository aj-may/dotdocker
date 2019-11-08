![dotdocker](https://dotdocker-github-header.now.sh)

A utility to help setup a docker development environment with host based routing

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![version](https://img.shields.io/npm/v/dotdocker.svg?style=flat)](https://www.npmjs.com/package/dotdocker)
[![MIT License](https://img.shields.io/npm/l/dotdocker.svg?style=flat)](https://github.com/aj-may/dotdocker/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat)](http://commitizen.github.io/cz-cli/)
![GitHub All Releases](https://img.shields.io/github/downloads/aj-may/dotdocker/total.svg?style=flat)

## Installation

### Using homebrew

```sh
brew install aj-may/dotdocker/dotdocker
```

### Using npm

To install `dotdocker` globally using `npm`, run the following:

```sh
npm install -g dotdocker
```

## Usage

Before Starting `dotdocker`, make sure you are not running any other software that is listening on
ports 53, 80, or 443. This will cause the command to fail. To allow the script to modify your
systems DNS configuration, it may ask you to run the command with `sudo`.

```text
Usage: dotdocker [options] [command]

A utility to help setup a docker development environment with host based routing

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  start          Pull and start the proxy container and configure DNS
  stop           Stop the proxy container
  restart        Restart the proxy container
```
