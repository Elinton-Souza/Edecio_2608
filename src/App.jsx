import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const [resposta1, setResposta1] = useState("");
  const [media, setMedia] = useState(null);
  const [status, setStatus] = useState("");

  function calculaMedia(data) {
    const nome = data.nome;
    const nota1 = Number(data.nota1);
    const nota2 = Number(data.nota2);

    const mediaCalc = (nota1 + nota2) / 2;
    let statusAtual = "";

    if (mediaCalc < 4) {
      statusAtual = "Reprovado";
    } else if (mediaCalc >= 4 && mediaCalc < 6) {
      statusAtual = "Em Exame";
    } else {
      statusAtual = "Aprovado";
    }
    setResposta1(
      `${nome}, você tirou ${nota1} na primeira e ${nota2} na segunda.`
    );
    setMedia(mediaCalc);
    setStatus(statusAtual);
  }

  return (
    <>
      <div className="cabecalho">
        <img src="./conselho.jpeg" alt="avaliacao" />
        <h1>Conselho de Classe</h1>
        <h2>Média Final</h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit(calculaMedia)}>
        <p>
          <label htmlFor="nome">Nome do Aluno: </label>
          <input
            type="text"
            required
            className="campos"
            {...register("nome")}
          />
        </p>
        <p>
          <label htmlFor="nota1">Digite a 1ª Nota: </label>
          <input
            type="number"
            required
            className="campos"
            {...register("nota1")}
          />
        </p>
        <p>
          <label htmlFor="nota2">Digite a 2ª Nota: </label>
          <input
            type="number"
            required
            className="campos"
            {...register("nota2")}
          />
        </p>
        <p>
          <input type="submit" value="Média Final" className="btn submit" />
          <input
            type="reset"
            value="Calcular nova média"
            className="btn reset"
          />
        </p>
      </form>
      <h3>{resposta1}</h3>
      {media !== null && (
        <h3>
          Você ficou com{" "}
          {media.toLocaleString("pt-br", { minimumFractionDigits: 2 })} de
          média. Seu status é: <span
            className={
              status === "Aprovado"
                ? "status-aprovado"
                : status === "Em Exame"
                ? "status-exame"
                : status === "Reprovado"
                ? "status-reprovado"
                : ""
            }
          >
            {status}
          </span>
        </h3>
      )}
    </>
  );
}

export default App;
