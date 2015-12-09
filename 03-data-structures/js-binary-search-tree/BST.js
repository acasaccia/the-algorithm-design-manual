module.exports = function BST() {

    this.search = function(key) {
        if (this.key === key) {
            return this;
        } else if (this.key < key) {
            return this.right.search(key);
        } else if (this.key > key) {
            return this.left.search(key);
        }
    };

    this.insert = function(key, value) {
        if (this.key === undefined) {
            this.key = key;
            this.value = value;
            this.left = new BST();
            this.right = new BST();
        } else if (this.key < key) {
            this.right.insert(key, value);
        } else if (this.key > key) {
            this.left.insert(key, value);
        } else {
            this.value = value;
        }
    };

    this.next = function(key) {
        if (this.key === undefined) {
            return;
        }
        if (this.key <= key) {
            return this.right.next(key);
        }
        if (this.key > key) {
            if (this.left.key && this.left.max().key > key) {
                return this.left.next(key);
            } else {
                return this;
            }
        }
    };

    this.prev = function(key) {
        if (this.key === undefined) {
            return;
        }
        if (this.key >= key) {
            return this.left.prev(key);
        }
        if (this.key < key) {
            if (this.right.key && this.right.min().key < key) {
                return this.right.prev(key);
            } else {
                return this;
            }
        }
    };

    this.max = function() {
        if (this.right.key === undefined) {
            return this;
        } else {
            return this.right.max();
        }
    };

    this.min = function() {
        if (this.left.key === undefined) {
            return this;
        } else {
            return this.left.min();
        }
    };

    this.delete = function(key) {
        // hibbard deletion:
        // no childs
        // 1 child
        // 2 childs
    };

};