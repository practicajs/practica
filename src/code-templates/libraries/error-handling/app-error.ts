export class AppError extends Error {
  constructor(
    public name: string,
    public message: string,
    public HTTPStatus: number = 500,
    public isCatastrophic = false,
    public cause?: unknown
  ) {
    super(message);
  }
}
