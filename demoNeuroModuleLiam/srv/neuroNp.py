import numpy as np
from keras import backend as K
import numpy as np

class Net():
    def __init__(self):
        self.inputs = K.placeholder((None, 2), dtype=np.float32)
        self.hidden1 = K.layers.Dense(2, activation="relu")(self.inputs)
        self.hidden2 = K.layers.Dense(2, activation="relu")(self.hidden1)
        self.outputs = K.layers.Dense(1)(self.hidden2)

    def forward(self, inputs):
        hidden1 = self.hidden1(inputs)
        hidden2 = self.hidden2(hidden1)
        outputs = self.outputs(hidden2)
        return outputs


def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def step(x):
    return x > 0

def train(net, X, Y, eta, epochs):
    for i in range(epochs):
        outputs = net(X)
        errors = Y - outputs
        weights = list(map(lambda x: x * eta, zip(*[wi.weights for wi in net._forward_graph])))
        net._forward_graph = [list(zip([w + error for w, error in zip(weights[layer], errors)])) for layer in range(len(net._forward_graph))]
    return net

net1 = {}
net2 = {1:{}}
net2[1][1] = []
net2[1][1].append({1: [0.5]])
net2[1][1].append({2: [0.5]])
net2[1][2] = []
net2[1][2].append({3: [0.5]])

X_train = [[1], [2]]
Y_train = [1, 0]

net1 = {**net1, **net2}

eta = 0.5
epochs = 1000


net = Net()
net.compile(loss="mean_squared_error", optimizer="adam")

num_samples = 1000
inputs = np.random.randn(num_samples, 2).astype("float32")
targets = np.sin(inputs) + np.random.normal(scale=0.1, size=num_samples).astype("float32")

batch_size = 32
for epoch in range(100):
    inputs = inputs[:, None]
    targets = targets[:, None]
    indices = np.arange(num_samples)
    np.random.shuffle(indices)
    inputs = inputs[indices]
    targets = targets[indices]

    for start in range(0, num_samples - batch_size, batch_size):
        end = min(start + batch_size, num_samples)
        losses = []
        for offset in range(start, end, batch_size):
            inputs_batch = inputs[offset:(offset + batch_size), :]
            targets_batch = targets[offset:(offset + batch_size), :]
            outputs_batch = net.predict(inputs_batch)

            loss_batch = K.mean(K.square(targets_batch - outputs_batch), axis=-1)
            losses.append(loss_batch)
        avg_loss = sum(losses) / len(losses)
        print(f"Epoch {epoch + 1}: Average loss={avg_loss}")