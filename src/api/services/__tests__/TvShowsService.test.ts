import { fetchPopularTvShows, searchTvShows, getTvShowById } from "../TvShowsService";
import { FetchConfig } from "~/api/ApiCall";
import { tvShowDetailsFixture } from "~/testUtils/fixtures/tvShowDetailsFixture";
import { tvShowsDataFixture } from "~/testUtils/fixtures/tvShowsDataFixture";

const mockGetJson = jest.fn();
jest.mock("../../apiCall.ts", () => ({
  getJSON: (config: FetchConfig) => mockGetJson(config)
}));

describe("tv shows service tests", () => {
  beforeEach(() => {
    mockGetJson.mockClear();
  });
  it("Should return upcoming tv shows data response", async () => {
    mockGetJson.mockImplementation(() => Promise.resolve(tvShowsDataFixture));

    const response = await fetchPopularTvShows(1);

    expect(response).toStrictEqual(tvShowsDataFixture);
    expect(mockGetJson).toHaveBeenCalledWith({
      url: "tv/popular?page=1"
    });
  });

  it("Should return searched tv shows data response", async () => {
    mockGetJson.mockImplementation(() => Promise.resolve(tvShowsDataFixture));

    const response = await searchTvShows(1, "test");

    expect(response).toStrictEqual(tvShowsDataFixture);
    expect(mockGetJson).toHaveBeenCalledWith({
      url: "search/tv?page=1&query=test"
    });
  });

  it("Should return tv show response", async () => {
    mockGetJson.mockImplementation(() => Promise.resolve(tvShowDetailsFixture));

    const response = await getTvShowById(1);

    expect(response).toStrictEqual(tvShowDetailsFixture);
    expect(mockGetJson).toHaveBeenCalledWith({
      url: "tv/1"
    });
  });
});
