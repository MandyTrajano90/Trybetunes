import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

function Login() {
  const navigating = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);
  }

  function showForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    createUser({ name }).then((userName) => {
      setName('');

      if (userName === 'OK') {
        setLoading(false);
        navigating('/search');
      }
    });
  }

  return (
    <>
      { loading && (<Loading />) }
      <form className="login-form" onSubmit={ showForm }>
        <div>
          <label htmlFor="login-name-input">Nome</label>
          <input
            type="text"
            name="login-name-input"
            data-testid="login-name-input"
            placeholder="Nome"
            value={ name }
            onChange={ handleChange }
          />
        </div>
        <button
          data-testid="login-submit-button"
          onClick={ handleClick }
          disabled={ name.length < 3 }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
