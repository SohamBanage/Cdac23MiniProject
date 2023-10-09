using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementBackend.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext>options):base(options)
        {
            
        }
        public DbSet<Employee> Employees { get; set; }//is a property that represents a database table
    }
}
