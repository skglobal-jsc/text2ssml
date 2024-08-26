class SSMLConverter {
  private ssml: string;
  private lexicon: Record<
    string,
    {
      type: string; // alias or phoneme
      value: string; // value to replace with (alias) or phoneme value
    }
  >;

  constructor() {
    this.ssml = '';
    this.lexicon = {};
  }

  // Load lexicon for SSML conversion
  loadLexicon(lexicon: Record<string, { type: string; value: string }>) {
    this.lexicon = lexicon;
    return this;
  }

  // Start the SSML document
  start() {
    this.ssml = '<speak>';
    return this;
  }

  // End the SSML document
  end() {
    this.ssml += '</speak>';
    return this.ssml;
  }

  // Add text with lexicon replacement support
  // Add text with lexicon replacement support for Japanese text (no spaces between words)
  addText(text: string) {
    let i = 0;
    while (i < text.length) {
      let matched = false;
      for (const lexeme in this.lexicon) {
        if (text.startsWith(lexeme, i)) {
          const entry = this.lexicon[lexeme];
          if (entry.type === 'alias') {
            this.ssml += `<sub alias="${entry.value}">${lexeme}</sub>`;
          } else if (entry.type === 'phoneme') {
            this.ssml += `<phoneme alphabet="ipa" ph="${entry.value}">${lexeme}</phoneme>`;
          }
          i += lexeme.length; // Move index forward by the length of the matched lexeme
          matched = true;
          break;
        }
      }
      if (!matched) {
        this.ssml += text[i];
        i++;
      }
    }
    return this;
  }

  // Add a break (pause)
  addBreak(time = '500ms') {
    this.ssml += `<break time="${time}" />`;
    return this;
  }

  // Add emphasis
  addEmphasis(text: string, level = 'moderate') {
    this.ssml += `<emphasis level="${level}">${text}</emphasis>`;
    return this;
  }

  // Add a sentence with different pitch and rate
  addProsody(text: string, pitch = 'medium', rate = 'medium') {
    this.ssml += `<prosody pitch="${pitch}" rate="${rate}">${text}</prosody>`;
    return this;
  }

  // Add a sentence with a specific voice
  addVoice(text: string, voiceName = 'default') {
    this.ssml += `<voice name="${voiceName}">${text}</voice>`;
    return this;
  }

  // Add a substitution (sub)
  addSub(text: string, alias: string) {
    this.ssml += `<sub alias="${alias}">${text}</sub>`;
    return this;
  }

  // Add say-as (interpretation)
  addSayAs(text: string, interpretAs = 'spell-out', format?: string) {
    if (format) {
      this.ssml += `<say-as interpret-as="${interpretAs}" format="${format}">${text}</say-as>`;
    } else {
      this.ssml += `<say-as interpret-as="${interpretAs}">${text}</say-as>`;
    }
    return this;
  }
}

export default SSMLConverter;
