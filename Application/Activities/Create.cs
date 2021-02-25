using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> //Command is the class we want to validate against
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                _context.Activities.Add(activity); //the addAsync SHOuld NOT beused, it seems. microsoft docs says so because this isn't a special value generator.
                
                var creatorUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendeeRelationship = new UserActivity{
                    AppUser = creatorUser,
                    Activity = activity,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };
                
                _context.UserActivities.Add(attendeeRelationship);

                var success = await _context.SaveChangesAsync(); //this holds the amount of changes made to the DB (should be 1 if successful)

                if (success > 0)
                    return Unit.Value; //this empty object returned means the request was successful

                throw new Exception("Problem saving a new activity");
            }
        }
    }
}