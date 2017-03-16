'use strict';

let cnn = () => {
    const {evaluate, CNN, sample} = require('../index');

    const bulk = sample.yeast();

    let cnn = new CNN();
    cnn.configure({learning_rate: 0.1, momentum: 0.001, batch_size: 1, l2_decay: 0.0001});

    let layer = [];
    layer.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: 8});
    layer.push({type: 'svm', num_classes: 10});
    cnn.makeLayer(layer);

    cnn.train(bulk.dataset, bulk.labels);
    let result = cnn.test(bulk.dataset);
    let evaluation = evaluate.accuracy(bulk.labels, result);
    console.log('CNN', Math.round(evaluation.micro.PRECISION * 10000) / 100);
};

let knn = () => {
    const {evaluate, kNN, sample} = require('../index');
    let knn = new kNN();
    const bulk = sample.yeast();
    knn.train(bulk.dataset, bulk.labels);
    let result = knn.test(bulk.dataset, 5);
    let evaluation = evaluate.accuracy(bulk.labels, result);
    console.log('kNN', Math.round(evaluation.micro.PRECISION * 10000) / 100);
};

let bayes = () => {
    const {evaluate, Bayes, sample} = require('../index');
    bayes = new Bayes();
    const bulk = sample.yeast();
    bayes.train(bulk.dataset, bulk.labels);
    let result = bayes.test(bulk.dataset);
    let evaluation = evaluate.accuracy(bulk.labels, result);
    console.log('bayes', Math.round(evaluation.micro.PRECISION * 10000) / 100);
};

bayes();
cnn();
knn();