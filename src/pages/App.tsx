import React, { useState } from 'react';
import Cronometro  from '../components/Cronometro';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import { Tarefa } from '../Interface/tarefas';
import style from './App.module.scss';

function App() {
  const[tarefas, setTarefas] = useState<Tarefa[] | []> ([
  ]);
  
  const[ selecionado, setSelecionado] = useState<Tarefa>()

  function selecionaTarefa(tarefaSelecionada: Tarefa) {
    setSelecionado(tarefaSelecionada);
    
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
      ...tarefa,
      selecionado: tarefa.id === tarefaSelecionada.id ? true : false

    })));
  }


  function finalizarTarefa() {
    if(selecionado) {
        setTarefas(tarefasAnteriores =>
        tarefasAnteriores.map(tarefa => {
            if(tarefa.id === selecionado.id) {
                return {
                    ...tarefa,
                    selecionado: false,
                    completado: true
                }
            }
            return tarefa;
        }))
    }
  }

  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas}/>
      <Lista 
        selecionaTarefa={selecionaTarefa}
        tarefas={tarefas}/>
      <Cronometro 
        selecionado={selecionado}
        finalizarTarefa={finalizarTarefa}/>
    </div>
  );
}

export default App;
