import NavbarCard from './NavbarCard';
const Navbar = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    cache: 'no-store',
  });
  const { data: userData } = await res.json();
  return (
    <nav>
      <NavbarCard me={userData} />
    </nav>
  );
};

export default Navbar;
