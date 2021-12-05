import { tvShowsDataFixture } from "~/testUtils/fixtures/tvShowsDataFixture";
import { mergeTvShowsData } from "~/utils/mergeTvShowsData";

describe("mergeTvShowsData tests", () => {
  it("Should combine tv shows data", () => {
    const result = mergeTvShowsData(tvShowsDataFixture, tvShowsDataFixture.results);

    expect(result.results).toStrictEqual([
      ...tvShowsDataFixture.results,
      ...tvShowsDataFixture.results
    ]);
  });

  it("Should return only new data if previous data is undefined", () => {
    const result = mergeTvShowsData(tvShowsDataFixture, undefined);
    expect(result.results).toStrictEqual(tvShowsDataFixture.results);
  });

  it("Should return only new data if previous data results is undefined", () => {
    const result = mergeTvShowsData(tvShowsDataFixture, []);
    expect(result.results).toStrictEqual(tvShowsDataFixture.results);
  });
});
