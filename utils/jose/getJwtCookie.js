// We don't use it ! Because in this way, need to set 'httpOnly' to false...
import { getCookie } from 'cookies-next';

const getJwtCookie = name => {
	const cookie = getCookie(name);
	return cookie;
};

export default getJwtCookie;
