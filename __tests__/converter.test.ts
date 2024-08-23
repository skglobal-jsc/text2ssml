import SSMLConverter from '../src/converter';

describe('SSMLConverter', () => {
  let converter: SSMLConverter;

  beforeEach(() => {
    converter = new SSMLConverter();
  });

  describe('addSayAs', () => {
    it('should add say-as without format', () => {
      const result = converter.start().addSayAs('123', 'spell-out').end();
      expect(result).toBe(
        '<speak><say-as interpret-as="spell-out">123</say-as></speak>'
      );
    });

    it('should add say-as with format', () => {
      const result = converter
        .start()
        .addSayAs('2023-10-01', 'date', 'ymd')
        .end();
      expect(result).toBe(
        '<speak><say-as interpret-as="date" format="ymd">2023-10-01</say-as></speak>'
      );
    });

    // test sub alias
    it('should add sub alias', () => {
      const result = converter.start().addSub('123', 'alias').end();
      expect(result).toBe('<speak><sub alias="alias">123</sub></speak>');
    });
  });
});
