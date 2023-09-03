import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>();

  useEffect(() => {
    async function gettingUser() {
      setLoading(true);
      const someone = await getUser();
      setUser(someone);
      setLoading(false);
    }
    gettingUser();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
      <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
      <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      <h2 data-testid="header-user-name">{ user?.name }</h2>
    </header>
  );
}

export default Header;
