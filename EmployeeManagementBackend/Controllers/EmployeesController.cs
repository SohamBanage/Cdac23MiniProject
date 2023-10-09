using EmployeeManagementBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;
        public EmployeesController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
            
        }
        [HttpGet]//get list of all employee
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            if( _employeeContext.Employees == null)
            {
                return NotFound();
            }
            return await _employeeContext.Employees.ToListAsync();
        }


        [HttpGet("{id}")]//getting employee on the basis of id
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_employeeContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _employeeContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
            
        }
        [HttpPost]
        public async Task<ActionResult<Employee>>PostEmployee(Employee employee)
        {
            _employeeContext.Employees.Add(employee);
            await _employeeContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee),new {id=employee.Id},employee);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutEmployee(int id,Employee employee)
        {
            if(id != employee.Id)
            {
                return BadRequest();
            }
            _employeeContext.Entry(employee).State = EntityState.Modified;//trying to update the state of the perticular employee
            try
            {
                await _employeeContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) 
            {
                throw;
            }
            return Ok(); //returs status code of 200
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteEmployee(int id)
        {
            if(_employeeContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _employeeContext.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();
            return Ok();
        }
    }
}
