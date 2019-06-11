workflow "Create Release" {
  on = "push"
  resolves = ["Release"]
}

action "If Master" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "Install Dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
  needs = ["If Master"]
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install Dependencies"]
  args = "build"
}

action "Release" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  args = "semantic-release"
  secrets = ["GH_TOKEN", "NPM_TOKEN"]
}
