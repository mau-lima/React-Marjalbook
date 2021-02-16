using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        [JsonPropertyName("attendees")] //this makes the property show up as Attendees on the JSON, while keeping it with the UserActivities name, which helps automapper map activity.useractivities to activitydto.useractivities
        public ICollection<AttendeeDto> UserActivities { get; set; }
    }
}