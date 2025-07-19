using FI.AtividadeEntrevista.DML;
using FI.AtividadeEntrevista.DAL.Clientes;
using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    /// <summary>
    /// Regras de negócio para Beneficiário
    /// </summary>
    public class BoBeneficiario
    {
        public void Incluir(Beneficiario beneficiario)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            dao.Incluir(beneficiario);
        }

        public void ExcluirTodosPorCliente(long idCliente)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            dao.ExcluirTodosPorCliente(idCliente);
        }

        public List<Beneficiario> ListarPorCliente(long idCliente)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            return dao.ListarPorCliente(idCliente);
        }
    }
} 