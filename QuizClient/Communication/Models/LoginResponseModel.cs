namespace Communication.Models
{
    public class LoginResponseModel
    {
        public string Message { get; set; }
        public string Authorization { get; set; }
        public int StatusCode { get; set; }
        public string Status { get; set; }
    }
}
