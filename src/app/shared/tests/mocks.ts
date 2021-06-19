
export let store: any = {};

export const localStorageMock = {
  setItem:  jest.fn((key: string, value: any) => store[key] = value),
  getItem: jest.fn((key: string) => store[key]),
  clear: jest.fn(() => store = {})
}

export const routerMock = {
  navigate: async (route : any) => await true
}
