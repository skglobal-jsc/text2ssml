import SSMLConverter from '../src/converter';

describe('SSMLConverter', () => {
  let converter: SSMLConverter;

  beforeEach(() => {
    converter = new SSMLConverter();

    // load lexicon for testing
    converter.loadLexicon({
      alias: { type: 'alias', value: 'alias' },
      phoneme: { type: 'phoneme', value: 'phoneme' },
    });
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

    // test lexicon phoneme
    it('should add phoneme', () => {
      const result = converter.start().addText('phoneme').end();
      expect(result).toBe('<speak><phoneme alphabet="ipa" ph="phoneme">phoneme</phoneme></speak>');
    });

    // test lexicon alias
    it('should add alias', () => {
      const result = converter.start().addText('alias').end();
      expect(result).toBe('<speak><sub alias="alias">alias</sub></speak>');
    });

    // test multiple words with lexicon
    it('should add multiple words with lexicon', () => {
      const result = converter.start().addText('alias phoneme').end();
      expect(result).toBe('<speak><sub alias="alias">alias</sub> <phoneme alphabet="ipa" ph="phoneme">phoneme</phoneme></speak>');
    });

    // the lexicon is case-sensitive.
    it('should add multiple words with lexicon (case-sensitive)', () => {
      const result = converter.start().addText('Alias Phoneme').end();
      expect(result).toBe('<speak>Alias Phoneme</speak>');
    });
  });
});
