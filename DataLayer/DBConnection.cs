using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace DataLayer
{
    public class DBConnection
    {
        private static SqlConnection getSqlConnection()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
            var root = builder.Build();
            return new SqlConnection(root.GetConnectionString("connection"));
        }

        public static void ExecuteQuery(string query, Action<SqlCommand> parameterSetup = null)
        {
            using (SqlConnection connection = getSqlConnection())
            {
                try
                {
                    connection.Open();
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        parameterSetup?.Invoke(cmd);
                    }
                    connection.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }
    }
}
