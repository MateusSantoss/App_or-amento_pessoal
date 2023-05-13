class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}




	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()
		

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a despesa

			let despesa = JSON.parse((localStorage.getItem(i)))
			

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if (despesa === null) {
				continue
			}

			
            despesa.id = i


			despesas.push(despesa)
			
			
		}
		
		return despesas



		
	}
	pesquisar(despesa) {
		let filtrarRegistros = Array()
		filtrarRegistros = this.recuperarTodosRegistros()
        //ano
        if (despesa.ano != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.ano == f.ano)

        }
        //mes
        if (despesa.mes != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.mes == f.mes)

        }
        //dia
        if (despesa.dia != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.dia == f.dia)

        }
        //tipo
        if (despesa.tipo != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.tipo == f.tipo)

        }
        //descricao
        if (despesa.descricao != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.descricao == f.descricao)

        }
        //valor
        if (despesa.valor != '') {
        	filtrarRegistros = filtrarRegistros.filter(f => despesa.valor == f.valor)

        }
        
        return filtrarRegistros
        
       
		
		
			} 




		remover(id) {
			console.log(id)
			localStorage.removeItem(id)
			

		}

		 }

function mediaDeGastos() {
	let mediaGastos = Array()
	mediaGastos = bd.pesquisar()

	console.log(mediaGastos)

}



let bd = new Bd()


function criarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)

	


	//despesa.validarDespesa ()
	if (despesa.validarDados()) {
		$('#modal_despesa').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-success'
		document.getElementById('modal_titulo').innerHTML = 'Sucesso'
		document.getElementById('modal_body').innerHTML = 'Despesa cadastrada com sucesso'
		document.getElementById('modal_btn').innerHTML = 'voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
	   ano.value = ''
	   mes.value = ''
	   dia.value = ''
	   tipo.value = ''
	   descricao.value = ''
       valor.value = ''


	}else {
		
		$('#modal_despesa').modal('show')
		document.getElementById('modal_header').className = 'modal-header text-danger'
		document.getElementById('modal_titulo').innerHTML = 'Erro'
		document.getElementById('modal_body').innerHTML = 'Erro, verifique se todos os dados foram preenchidos'
		document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'


	}

	bd.gravar(despesa)
	

	 
	 }
function carregaListaDespesas(despesas = Array(), filtro = false) {

	
     if (despesas.length == 0 && filtro == false) {
     	despesas = bd.recuperarTodosRegistros() 
     }
	

	let listasDespesas = document.getElementById('listaDespesas')
	listasDespesas.innerHTML = ''
	

	despesas.forEach(function(d) {
		let linha = listasDespesas.insertRow()

		
		


       
		linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` 
		
		switch (parseInt(d.tipo)) {
		case 1: 
			d.tipo = 'Alimentação'
			break;
		case 2: 
			d.tipo = 'Educação'
			break;
		case 3:
			d.tipo = 'lazer'
			break;
		case 4: 
			d.tipo = 'saude'
			break;
		case 5: 
			d.tipo = 'transporte'
			break;


		}

		console.log(d)
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
        //remover despesas
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = "<i class='fas fa-times'></i>"
		btn.id = `id_despesa${d.id}`
		btn.onclick = function () {
			//alert(this.id)
			let id = this.id.replace('id_despesa', '')
			bd.remover(id)
			$('#modal_consulta').modal('show')
			console.log('tudo certo até aqui')
			window.location.reload()

		}
		linha.insertCell(4).append(btn)
		

	})


	
}

function modal () {
	window.location.reload()
	
}

function pesquisarDespesa () {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa (ano, mes, dia, tipo, descricao, valor)
	let despesas = bd.pesquisar(despesa)



	carregaListaDespesas(despesas, true)

	
	




	

}
