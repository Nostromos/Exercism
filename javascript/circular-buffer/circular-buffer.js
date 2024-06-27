class CircularBuffer {
  constructor(size) {
    this.buffer = new Array(size).fill(null);
    this.size = 0;
    this.writeIndex = 0;
    this.readIndex = 0;
  }

  write(data) {
    if (this.size === this.buffer.length) throw new BufferFullError();

    this.buffer[this.writeIndex] = data;

    this.updateWrite();
    this.size++;
  }

  read() {
    if (this.size === 0) throw new BufferEmptyError();

    let data = this.buffer[this.readIndex];
    this.buffer[this.readIndex] = null;

    if (this.buffer[this.writeIndex] !== null) {
      this.writeIndex = this.readIndex;
    }
    this.updateRead();
    this.size--;

    return data;
  }

  forceWrite(data) {
    if (this.size < this.buffer.length) {
      this.write(data);
    } else {
      this.buffer[this.writeIndex] = data;
      this.updateWrite();
      this.updateRead();
    }
  }

  clear() {
    if (this.size === 0) return;
    this.size = this.head = this.tail = 0;
    this.buffer.fill(null);
  }

  updateWrite() {
    this.writeIndex = (this.writeIndex + 1) % this.buffer.length;
  } 

  updateRead() {
    this.readIndex = (this.readIndex + 1) % this.buffer.length;
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor(message) {
    super(message);
    this.name = "BufferFullError"
  }
}

export class BufferEmptyError extends Error {
  constructor(message) {
    super(message);
    this.name = "BufferEmptyError"
  }
}
