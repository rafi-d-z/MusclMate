terraform {
  backend "s3" {
    bucket = "terraform-state-musclemate-jkim3273" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}