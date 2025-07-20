var beneficiarios = [];


$(document).ready(function () {


    $('#BeneficiarioCPF').on('input', function () {
        var v = $(this).val().replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        $(this).val(v);
    });


    $('#btnAddBeneficiario').click(function () {
        var cpf = $('#BeneficiarioCPF').val();
        var nome = $('#BeneficiarioNome').val();

        // Validação simples
        if (!cpf || !nome) {
            alert('Preencha CPF e Nome do beneficiário.');
            return;
        }
        // Validação de CPF
        if (!validarCPF(cpf)) {
            alert('CPF inválido!');
            return;
        }
        // Verifica duplicidade de CPF
        if (beneficiarios.some(b => b.cpf.replace(/\D/g, '') === cpf.replace(/\D/g, ''))) {
            alert('Já existe um beneficiário com este CPF.');
            return;
        }
        // Adiciona ao array
        beneficiarios.push({ cpf: cpf, nome: nome });
        atualizarGridBeneficiarios();
        $('#BeneficiarioCPF').val('');
        $('#BeneficiarioNome').val('');
    });

    // Excluir beneficiário
    $(document).on('click', '.btn-excluir-beneficiario', function () {
        var index = $(this).data('index');
        beneficiarios.splice(index, 1);
        atualizarGridBeneficiarios();
    });

    // Editar beneficiário (preenche campos e remove do array)
    $(document).on('click', '.btn-editar-beneficiario', function () {
        var index = $(this).data('index');
        var b = beneficiarios[index];
        $('#BeneficiarioCPF').val(b.cpf);
        $('#BeneficiarioNome').val(b.nome);
        beneficiarios.splice(index, 1);
        atualizarGridBeneficiarios();
    });

    function atualizarGridBeneficiarios() {
        var html = '';
        beneficiarios.forEach(function (b, i) {
            html += '<tr>';
            html += '<td>' + b.cpf + '</td>';
            html += '<td>' + b.nome + '</td>';
            html += '<td class="align-middle gap-2">';
            html += '<button type="button" class="btn btn-primary btn-sm mr-2 btn-editar-beneficiario" data-index="' + i + '">Alterar</button>';
            html += '<button type="button" class="btn btn-danger btn-sm btn-excluir-beneficiario" data-index="' + i + '">Excluir</button>';
            html += '</td>';
            html += '</tr>';
        });
        $('#gridBeneficiarios').html(html);

        // Esconde ou mostra a tabela conforme a quantidade de beneficiários
        if (beneficiarios.length === 0) {
            $('#modalBeneficiarios table').hide();
            if ($('#nenhumBeneficiario').length === 0) {
                $('#gridBeneficiarios').parent().append('<div id="nenhumBeneficiario" class="text-center text-muted">Nenhum beneficiário adicionado.</div>');
            }
        } else {
            $('#modalBeneficiarios table').show();
            $('#nenhumBeneficiario').remove();
        }
    }


    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        var soma = 0, resto;
        for (var i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        soma = 0;
        for (var i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    // Inicializa a tabela oculta
    atualizarGridBeneficiarios();
});