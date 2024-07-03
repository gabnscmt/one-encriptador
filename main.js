document.addEventListener('DOMContentLoaded', function() {
	const feedbackDiv = document.querySelector('.conteudo__feedback');
	const criptografarBtn = document.querySelector('.btn__criptografar');
	const descriptografarBtn = document.querySelector('.btn__descriptografar');
	const textoCampo = document.querySelector('.conteudo__principal__campo');
	const saidaTexto = document.querySelector('.conteudo__saida__texto');
	const copiarBtn = document.querySelector('.conteudo__saida__texto__btn');
	const colarBtn = document.querySelector('.btn__colar');

	function criptografar(texto) {
		return texto
			.replace(/e/g, 'enter')
			.replace(/i/g, 'imes')
			.replace(/a/g, 'ai')
			.replace(/o/g, 'ober')
			.replace(/u/g, 'ufat');
	}

	function descriptografar(texto) {
		return texto
			.replace(/enter/g, 'e')
			.replace(/imes/g, 'i')
			.replace(/ai/g, 'a')
			.replace(/ober/g, 'o')
			.replace(/ufat/g, 'u');
	}

	function validarTexto(texto) {
		const regex = /^[a-z\s]+$/;
		return regex.test(texto);
	}

	function limparCampoTexto() {
		textoCampo.value = '';
	}

	function mostrarFeedbackVazio() {
		feedbackDiv.style.display = 'flex';
		setTimeout(() => {
			feedbackDiv.style.opacity = '1';
		}, 10);
	}

	function esconderFeedback() {
		feedbackDiv.style.opacity = '0';
		setTimeout(() => {
			feedbackDiv.style.display = 'none';
		}, 500);
	}

	function normalizarTexto(texto) {
		return texto
			.normalize("NFD") // Normaliza para decompor os caracteres acentuados
			.replace(/[\u0300-\u036f]/g, "") // Remove os sinais gráficos (diacríticos)
			.toLowerCase() // Converte para minúsculas
			.replace(/[^a-z\s]/g, ""); // Remove tudo que não for letra minúscula ou espaço
	}

	criptografarBtn.addEventListener('click', function() {
		let texto = textoCampo.value.trim();
		texto = normalizarTexto(texto); // Normaliza o texto antes de criptografar
		if (validarTexto(texto)) {
			const textoCriptografado = criptografar(texto);
			saidaTexto.textContent = textoCriptografado;
			esconderFeedback();
		} else {
			saidaTexto.textContent = "Por favor, insira apenas letras minúsculas e sem acentos.";
			mostrarFeedbackVazio();
		}
	});

	descriptografarBtn.addEventListener('click', function() {
		let texto = textoCampo.value.trim();
		texto = normalizarTexto(texto); // Normaliza o texto antes de descriptografar
		if (validarTexto(texto)) {
			const textoDescriptografado = descriptografar(texto);
			saidaTexto.textContent = textoDescriptografado;
			limparCampoTexto();
			esconderFeedback();
		} else {
			saidaTexto.textContent = "Por favor, insira apenas letras minúsculas e sem acentos.";
			mostrarFeedbackVazio();
		}
	});

	copiarBtn.addEventListener('click', function() {
		const textoParaCopiar = saidaTexto.textContent;
		navigator.clipboard.writeText(textoParaCopiar).then(() => {
			limparCampoTexto();
			saidaTexto.textContent = '';
			esconderFeedback();
		}).catch(err => {
			console.error("Falha ao copiar o texto: ", err);
		});
	});

	colarBtn.addEventListener('click', function() {
		navigator.clipboard.readText().then(textoColado => {
			textoCampo.value = textoColado;
			esconderFeedback();
		}).catch(err => {
			console.error("Falha ao colar o texto: ", err);
			alert("Não foi possível colar o texto. Verifique as permissões de acesso ao Clipboard.");
		});
	});

	textoCampo.addEventListener('input', function() {
		if (textoCampo.value.trim() === "") {
			mostrarFeedbackVazio();
		} else {
			esconderFeedback();
		}
	});
});