const users = [{id:1, username: 'admin', password: 'qwerty'}]

export const userAuth =({ username, password }:{username:string,password: string}): boolean=> {
  const user = users.find(u => u.username === username && u.password === password);
  return Boolean(user)
}
