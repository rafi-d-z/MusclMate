terraform {
  backend "s3" {
    bucket = "terraform-state-muscleman-lordfarquaadthecreator"
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}