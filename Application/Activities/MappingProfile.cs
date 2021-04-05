using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //properties with the same name will be automatically mapped, like Activity.Id -> ActivityDto.Id
            CreateMap<Activity, ActivityDto>(); 
            CreateMap<UserActivity,AttendeeDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, options => options.MapFrom(source => source.AppUser.Photos.FirstOrDefault(photo => photo.IsMain).Url));
            
        }
    }
}