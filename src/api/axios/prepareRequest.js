export default pl => {
  const { method = 'GET', url, id, data} = pl;
  const headers = { 'Leadhit-Site-Id': id };
  const base = { method, url, headers };
  switch (method) {
    case 'PUT':
    case 'POST': {
      base.data = data;
      break;
    }
  }
  return base;
}