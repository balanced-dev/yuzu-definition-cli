const should = require('should');
let config = {};
let fsStub = {};
const svc = require('../../../creation/index');

describe('base', function() {
    describe('directory and file creation tests', function() {	

        const userConfig = 
        {
            modules: []
        }

        beforeEach(() => {

            fsStub = require('../integration/_helpers/fsStub')();
            fsStub.cwd = "root";

            config = require('../../../config/configFactory').createForTesting(userConfig);
            config.fs = fsStub;
            config.creation.blockPaths.block.path = 'blocks';

        });

        it('Should add containing block directory in block type directory by default', function() {

            svc.addBlock(config, 'block', '', 'testBlock', {});

            fsStub.addedDir.should.equal('root\\blocks\\testBlock');
            Object.keys(fsStub.addedFiles)[0].should.equal('root\\blocks\\testBlock\\testBlock.html')

        });

        it('If directory exists then directory not added', function() {
            
            fsStub.doesDirExist = true;

            svc.addBlock(config, 'block', '', 'testBlock', {});

            fsStub.addedDir.should.equal('');
            fsStub.addedFiles.should.be.empty(); 

        });

        it('Should add files to root when not using block container', function() {
            
            config.directories.settings.createForComponent = false;

            svc.addBlock(config, 'block', '', 'testBlock', {})

            fsStub.addedDir.should.equal('');
            Object.keys(fsStub.addedFiles)[0].should.equal('root\\blocks\\testBlock.html')
            Object.keys(fsStub.addedFiles)[1].should.equal('root\\blocks\\testBlock.css')

        });


        it('If file exists when not using block container then files not added', function() {
            
            fsStub.doesFileExist = true;
            config.directories.settings.createForComponent = false;

            svc.addBlock(config, 'block', '', 'testBlock', {});

            fsStub.addedDir.should.equal('');
            fsStub.addedFiles.should.be.empty(); 

        });

        it('Should a file type need a directory then add the directory and add the file to it', function() {
            
            config.markup.settings.subdirectory = 'html';

            svc.addBlock(config, 'block', '', 'testBlock', {});

            fsStub.addedDir.should.equal('root\\blocks\\testBlock\\html');
            Object.keys(fsStub.addedFiles)[0].should.equal('root\\blocks\\testBlock\\html\\testBlock.html')

        });

    }) 
});