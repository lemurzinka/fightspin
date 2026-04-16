export default class GameFacade {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getState() {
    const res = await fetch(`${this.baseUrl}/api/state`);
    return res.json();
  }

  async spin(bet) {
  const response = await fetch(`${this.baseUrl}/api/spin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bet }) 
  });
  return await response.json();
}

}
