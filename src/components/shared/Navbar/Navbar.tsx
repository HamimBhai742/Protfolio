import NavbarCard from './NavbarCard';
import { getMe } from '@/helpers/getMe';

const Navbar = async () => {
  const userData = await getMe();
  return (
    <nav>
      <NavbarCard me={userData} />
    </nav>
  );
};

export default Navbar;
