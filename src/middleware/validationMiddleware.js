export class Validation {

    // Validação geral - parâmetro id
    validateIdParameter(req, res, next) {
        const { id } = req.params;

        // erro para ausência de valor
        if(!id)
            return res.status(400).json({ "message": "Parâmetro 'id' não informado!" })

        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        // Erro para id incorreto (estrutura UUID)
        if (!id.match(uuidRegex)) 
            return res.status(400).json({ "message": "Parâmetro 'id' inválido!" })
        

       return next();
    };


    // Validação de dados - Eventos
    valitadeEventData(req, res, next) {
        const { imagem, nome, data_inicio, data_fim, descricao, categoria_id, local_id, usuario_id } = req.body;

        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

        const emptyFields = [];

        if (!imagem)
            emptyFields.push('imagem');

        if (!nome)
            emptyFields.push('nome');

        if (!data_inicio)
            emptyFields.push('data_inicio');

        if (!data_fim)
            emptyFields.push('data_fim');

        if (!descricao)
            emptyFields.push('descricao');


        if (!categoria_id)
            emptyFields.push('categoria_id');

        if (!categoria_id.match(uuidRegex))
            return res.status(400).json({ "message": "'id' do campo 'categoria_id' inválido!" });

        if (!local_id)
            emptyFields.push('local_id');

        if (!local_id.match(uuidRegex))
            return res.status(400).json({ "message": "'id' do campo 'local_id' inválido!" });
        
        if (!usuario_id)
            emptyFields.push('usuario_id');

        if (!usuario_id.match(uuidRegex))
            return res.status(400).json({ "message": "'id' do campo 'usuario_id' inválido!" });


        if (emptyFields.length == 0) {
            return next();
        } else {
            if (emptyFields.length > 1) {
                return res.status(400).json({ "message": `Os campos ${emptyFields.join(', ')} são obrigatórios!` });
            } else {
                return res.status(400).json({ "message": `O campo ${emptyFields} é obrigatório!` });
            }
        };

    };


     // Validação de dados - Cargos
     valitadeRoleData(req, res, next) {
        
        if(!req.body.nome) {
            return res.status(400).json({error: "O campo 'nome' é obrigatório!"});
        };

        next();
     };


     // Validação - Usuários
     valitadeUserData(req, res, next) {
        const { nome, email, telefone, senha, cargo_id } = req.body;
        
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        
        const emptyFields = [];

        if (!nome)
            emptyFields.push('nome');

        if (!email)
            emptyFields.push('email');

        if (!telefone)
            emptyFields.push('telefone');

        if (!senha)
            emptyFields.push('senha');


        if (!cargo_id.match(uuidRegex))
            return res.status(400).json({ "error": "ID do campo 'cargo_id' inválido!" })


        if (emptyFields.length == 0) {
            return next();
        } else {
            if (emptyFields.length > 1) {
                return res.status(400).json({ "message": `Os campos ${emptyFields.join(', ')} são obrigatórios!` });
            } else {
                return res.status(400).json({ "message": `O campo ${emptyFields} é obrigatório!` });
            }
        };

    };

};
