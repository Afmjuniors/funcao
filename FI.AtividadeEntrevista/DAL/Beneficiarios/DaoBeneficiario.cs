using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace FI.AtividadeEntrevista.DAL.Clientes
{
    internal class DaoBeneficiario : AcessoDados
    {
        internal void Incluir(Beneficiario beneficiario)
        {
            var parametros = new List<System.Data.SqlClient.SqlParameter>
            {
                new System.Data.SqlClient.SqlParameter("CPF", beneficiario.CPF),
                new System.Data.SqlClient.SqlParameter("Nome", beneficiario.Nome),
                new System.Data.SqlClient.SqlParameter("IdCliente", beneficiario.IdCliente)
            };

            base.Executar("FI_SP_IncBeneficiario", parametros);
        }

        internal List<Beneficiario> ListarPorCliente(long idCliente)
        {
            var parametros = new List<System.Data.SqlClient.SqlParameter>
            {
                new System.Data.SqlClient.SqlParameter("IdCliente", idCliente)
            };

            DataSet ds = base.Consultar("FI_SP_ListBeneficiariosPorCliente", parametros);
            var lista = new List<Beneficiario>();

            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    lista.Add(new Beneficiario
                    {
                        Id = row.Field<long>("Id"),
                        CPF = row.Field<string>("CPF"),
                        Nome = row.Field<string>("Nome"),
                        IdCliente = row.Field<long>("IdCliente")
                    });
                }
            }
            return lista;
        }

        internal void ExcluirTodosPorCliente(long idCliente)
        {
            var parametros = new List<System.Data.SqlClient.SqlParameter>
            {
                new System.Data.SqlClient.SqlParameter("IdCliente", idCliente)
            };
            base.Executar("FI_SP_DelBeneficiariosPorCliente", parametros);
        }

        
    }
}