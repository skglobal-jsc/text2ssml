class SSMLConverter {
  private ssml: string;

  constructor() {
    this.ssml = '';
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

  // Add plain text
  addText(text: string) {
    this.ssml += text;
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
