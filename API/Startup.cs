using System.Text;
using API.Middleware;
using Application.Activities;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //this is where services are dependency injected
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseLazyLoadingProxies();
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(List.Handler));
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(cfg =>
            {
                cfg.RegisterValidatorsFromAssemblyContaining<Attend>();//checks the whole application project, not just the create class
            });

            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            services.AddAuthorization(opt =>
            {

                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.AddRequirements(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccesor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();


            if (env.IsDevelopment())
            {
                //enables a special exception page that shows more info to aid debugging. Not for production use.
                // app.UseDeveloperExceptionPage();

            }



            //not now, the project is just beginning! I also removed localhost:5001 from properties/launchsettings.json to prevent HTTPS listening
            // app.UseHttpsRedirection();

            //sets up the request routing middleware: it makes sure requests go to the right controller.
            app.UseRouting();

            app.UseCors("CorsPolicy");
            app.UseAuthentication();

            //since  we haven't conffigured it, it will just sit there.
            app.UseAuthorization();



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); //Maps each controller to an endpoint
            });
        }
    }
}
