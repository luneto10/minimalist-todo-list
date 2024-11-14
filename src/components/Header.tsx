import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <HomeIcon className='d-flex'/>
    </Link>
  );
}

