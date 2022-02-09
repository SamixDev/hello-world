import "./Modal.css";

export default function Modal({
    showModal,
    setShowModal,
    stateCommonData
}) {
    const nfts = stateCommonData.nft_collections?.length;
    const poaps = stateCommonData.poaps?.length;

    const handleOnClick = e => {
        if(e.target.className === "modal") {
            setShowModal(false);
        }
    }

    return (
        <>
            {
                showModal &&
                <div
                    className="modal"
                    onClick={handleOnClick}
                >
                    <div className="modal__container">
                        {
                            nfts > 0 &&
                            <div>
                                <div className="modal__container__title">NFT Collections</div>
                                {
                                    stateCommonData.nft_collections.map((elem, ind) => (
                                        <a
                                            key={ind}
                                            className="modal-card"
                                            href={`https://etherscan.io/address/${elem.address}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <div>{ind + 1})</div>
                                            <div>{elem.name}</div>
                                        </a>
                                    ))
                                }
                            </div>
                        }
                        {
                            poaps > 0 &&
                            <div>
                                <div className="modal__container__title">POAPs</div>
                                {
                                    stateCommonData.poaps.map((elem, ind) => (
                                        <a
                                            key={ind}
                                            className="modal-card"
                                            href={`https://app.poap.xyz/r/token/${elem.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <div>{ind + 1}</div>
                                            <div>{elem.name}</div>
                                        </a>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    );
}
