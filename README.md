# @sk-global/text2ssml

## Introduction

`@sk-global/text2ssml` is a library that converts text to SSML (Speech Synthesis Markup Language) for use with the Amazon Polly service. The library provides functions to convert text to SSML and to convert SSML to text.

Using a `Builder Pattern` approach, the library provides a fluent API to build SSML from text. The library also provides a function to convert SSML to text.

## Installation

```bash
npm install @sk-global/text2ssml
```

## Usage

### Convert text to SSML

```javascript
const SSMLConverter = require('@sk-global/text2ssml');
const converter = new SSMLConverter();
const result = converter.start().speak('Hello, world!').end();
```
