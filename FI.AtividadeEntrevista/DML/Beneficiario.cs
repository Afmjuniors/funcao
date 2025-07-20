using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DML
{
    /// <summary>
    /// Classe de beneficiário que representa o registro na tabela Beneficiarios do Banco de Dados
    /// </summary>
    public class Beneficiario
    {
        /// <summary>
        /// Id do beneficiário
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// CPF do beneficiário
        /// </summary>
        public string CPF { get; set; }

        /// <summary>
        /// Nome do beneficiário
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Id do cliente associado
        /// </summary>
        public long IdCliente { get; set; }
    }
}
