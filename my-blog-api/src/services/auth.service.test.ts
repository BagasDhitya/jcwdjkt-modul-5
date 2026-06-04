import { getExternalUser } from "./auth.service";
import nock from "nock";

describe("External User Service", () => {
  // block koneksi internet ketika testing api eksternal
  beforeAll(() => {
    nock.disableNetConnect();
  });

  // untuk clearing nock setelah test selesai
  afterEach(() => {
    nock.cleanAll();
  });

  test("harus sukses mengambil data user tanpa menembak internet asli", async () => {
    const mockUserResponse = {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
    };

    // setting nock (buat intercept ke url asli)
    nock("https://jsonplaceholder.typicode.com")
      .get("/users/1")
      .reply(200, mockUserResponse);

    const result = await getExternalUser(1);

    expect(result.name).toBe("John Doe");
    expect(result.email).toBe("john.doe@gmail.com");
  });

  test("harus melempar error yang sesuai jika api eksternal merespon 404", async () => {
    // asumsikan kita menembak id yang tidak ada di aslinya
    nock("https://jsonplaceholder.typicode.com").get("/users/99999").reply(404);

    await expect(getExternalUser(99999)).rejects.toThrow(
      "User eksternal tidak ditemukan",
    );
  });
});
