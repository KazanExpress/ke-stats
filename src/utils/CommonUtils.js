export const CommonUtils = {
  /**
   * Data should be sorted by condition parameter
   *
   * @param data incoming array of items
   * @param condition by which items will be grouped
   * @param aggregator should return result of concatenation of two items
   * @returns {Array} of items grouped {@link condition}
   */
  groupBy(data, condition, aggregator) {
    let res = [];
    res.push(data[0]);
    let i = 0;
    data.forEach(item => {
      if (condition(res[i], item)) {
        res[i] = aggregator(res[i], item);
      } else {
        res.push(item);
        i++;
      }
    });
    return res;
  }
};