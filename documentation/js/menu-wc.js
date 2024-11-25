'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' : 'data-bs-target="#xs-controllers-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' :
                                            'id="xs-controllers-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' : 'data-bs-target="#xs-injectables-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' :
                                        'id="xs-injectables-links-module-AppModule-848f22afd3e5dbab3dff5d519088f3e3fdffe9a949a5fd34fb02ad7843e8bc2a085dcac2e9f813f0f0159e167fa4b55b5ad42e02503088312320107f3b75d967"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c0f55e96cd67acf91cd94330ea92903dae465976289fd860e297b675c14cbc24502c1ebb82a97bcc488b2bf8ca3048637dd7f728c7cf1fb96af5263cea6ee8c4"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c0f55e96cd67acf91cd94330ea92903dae465976289fd860e297b675c14cbc24502c1ebb82a97bcc488b2bf8ca3048637dd7f728c7cf1fb96af5263cea6ee8c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c0f55e96cd67acf91cd94330ea92903dae465976289fd860e297b675c14cbc24502c1ebb82a97bcc488b2bf8ca3048637dd7f728c7cf1fb96af5263cea6ee8c4"' :
                                            'id="xs-controllers-links-module-AuthModule-c0f55e96cd67acf91cd94330ea92903dae465976289fd860e297b675c14cbc24502c1ebb82a97bcc488b2bf8ca3048637dd7f728c7cf1fb96af5263cea6ee8c4"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-17f02f4ceda1e57975cc9e64c12baaee64cdb8e160e8cf86392698af37f636469070d2a780c4292dc3d2fd75dc29fe549b69fccde3b09c1402ced29ad2afb4eb"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-17f02f4ceda1e57975cc9e64c12baaee64cdb8e160e8cf86392698af37f636469070d2a780c4292dc3d2fd75dc29fe549b69fccde3b09c1402ced29ad2afb4eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-17f02f4ceda1e57975cc9e64c12baaee64cdb8e160e8cf86392698af37f636469070d2a780c4292dc3d2fd75dc29fe549b69fccde3b09c1402ced29ad2afb4eb"' :
                                        'id="xs-injectables-links-module-PrismaModule-17f02f4ceda1e57975cc9e64c12baaee64cdb8e160e8cf86392698af37f636469070d2a780c4292dc3d2fd75dc29fe549b69fccde3b09c1402ced29ad2afb4eb"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' : 'data-bs-target="#xs-controllers-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' :
                                            'id="xs-controllers-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' : 'data-bs-target="#xs-injectables-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' :
                                        'id="xs-injectables-links-module-UserModule-bc950f357cc3eab41e145856887ad6c0dcf35e7faec048fdda97d6b7a99982acbbf0e8e183e191cee3a09ec2571012b372e18abca5be115bbf8f57253d2e882e"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthForgetDTO.html" data-type="entity-link" >AuthForgetDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthLoginDto.html" data-type="entity-link" >AuthLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRegisterDto.html" data-type="entity-link" >AuthRegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthResetDTO.html" data-type="entity-link" >AuthResetDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link" >CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogInterceptor.html" data-type="entity-link" >LogInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePatchUserDto.html" data-type="entity-link" >UpdatePatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePutUserDto.html" data-type="entity-link" >UpdatePutUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserIdCheckMiddleware.html" data-type="entity-link" >UserIdCheckMiddleware</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});