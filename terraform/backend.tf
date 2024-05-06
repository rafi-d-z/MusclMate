terraform {
  backend "s3" {
    bucket = "terraform-state-musclemate-cancanneed23" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"

}
}